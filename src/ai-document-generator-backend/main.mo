import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Text "mo:base/Text";

persistent actor {
  // ==============================
  // ====== Bagian Chat ===========
  // ==============================

  // Simpan riwayat chat
  private stable var history : [(Text, Text)] = [];

  // Fungsi untuk mengecek apakah pesan mengandung kata tertentu
  private func contains(text: Text, word: Text) : Bool {
    Text.contains(text, #text word)
  };

  // Fungsi utama chat
  public func chat(prompt: Text) : async Text {
    let lowerPrompt = Text.toLowercase(prompt);

    let reply = if (contains(lowerPrompt, "hi") or contains(lowerPrompt, "hello")) {
      "Hello! 👋 How can I help you today?"
    } else if (contains(lowerPrompt, "who are you")) {
      "I'm an AI chatbot running on Internet Computer!"
    } else if (contains(lowerPrompt, "help")) {
      "You can ask me anything. Try saying hi, asking who I am, or any other question!"
    } else if (contains(lowerPrompt, "bye") or contains(lowerPrompt, "goodbye")) {
      "Goodbye! 👋 Thanks for chatting!"
    } else {
      "🤖 Thanks for your message: \"" # prompt # "\". I'm a simple chatbot, ask me anything!"
    };

    // Simpan ke riwayat
    history := Array.append(history, [(prompt, reply)]);

    // Log untuk debug
    Debug.print("User: " # prompt);
    Debug.print("Bot: " # reply);

    reply
  };

  // Ambil semua riwayat chat
  public query func getHistory() : async [(Text, Text)] {
    history
  };

  // Hapus semua riwayat
  public func clearHistory() : async () {
    history := [];
    Debug.print("History cleared");
  };

  // Hitung jumlah percakapan
  public query func getHistoryCount() : async Nat {
    Array.size(history)
  };

  // ==============================
  // ====== Bagian File ===========
  // ==============================

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

  // Upload file
  public shared (msg) func upload_file(name : Text, bytes : [Nat8]) : async Nat {
    let id = nextId;
    nextId += 1;

    let content : Blob = Blob.fromArray(bytes);

    let meta : DocMeta = {
      id = id;
      name = name;
      size = Array.size(bytes);
      uploaded_at = Time.now();
      uploader = msg.caller;
      uploader_name = null;
    };

    files := Array.append(files, [meta]);
    fileContents := Array.append(fileContents, [(id, content)]);

    id
  };

  // Set display name uploader
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

  // List semua file
  public query func list_files() : async [DocMeta] {
    files
  };

  // Ambil file berdasarkan id
  public query func get_file(id : Nat) : async ?(Text, [Nat8]) {
    var result : ?(Text, [Nat8]) = null;

    label outer for ((fid, content) in fileContents.vals()) {
      if (fid == id) {
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
