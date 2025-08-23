import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Array "mo:base/Array";

actor {
  public type DocMeta = {
    id : Nat;
    name : Text;
    size : Nat;
    uploaded_at : Int;
    uploader : Principal;
    uploader_name : ?Text;
  };

  stable var files : [DocMeta] = [];
  stable var fileContents : [(Nat, Blob)] = [];
  stable var nextId : Nat = 0;

  // ✅ Ambil principal dari caller, tidak perlu dikirim dari FE
  public shared (msg) func upload_file(name : Text, bytes : [Nat8]) : async Nat {
    let id = nextId;
    nextId += 1;

    let content : Blob = Blob.fromArray(bytes);

    let meta : DocMeta = {
      id = id;
      name = name;
      // Blob tidak punya .size → hitung dari array byte
      size = Array.size(bytes);
      uploaded_at = Time.now();
      uploader = msg.caller;
      uploader_name = null;
    };

    files := Array.append(files, [meta]);
    fileContents := Array.append(fileContents, [(id, content)]);

    id
  };

  // Opsional: set display name untuk semua file yang diupload caller
  public shared (msg) func set_display_name(name : Text) : async () {
    files := Array.map<DocMeta, DocMeta>(files, func (f : DocMeta) : DocMeta {
      if (f.uploader == msg.caller) {
        {
          id = f.id;
          name = f.name;
          size = f.size;
          uploaded_at = f.uploaded_at;
          uploader = f.uploader;
          uploader_name = ?name;
        }
      } else {
        f
      }
    });
  };

  public query func list_files() : async [DocMeta] {
    files
  };

  // ✅ Kembalikan ?(Text, [Nat8]) sesuai IDL
  public query func get_file(id : Nat) : async ?(Text, [Nat8]) {
    var result : ?(Text, [Nat8]) = null;

    // cari blob konten
    label outer for ((fid, content) in fileContents.vals()) {
      if (fid == id) {
        // cari meta utk ambil nama
        for (m in files.vals()) {
          if (m.id == id) {
            result := ?(m.name, Blob.toArray(content));
            break outer;
          };
        };
      };
    };

    result
  };
};
