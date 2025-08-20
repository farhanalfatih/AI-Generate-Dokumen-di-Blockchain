// Deklarasi actor persistent (diperlukan untuk stable variables)
persistent actor MyActor {
  // Gunakan 'stable' untuk variabel yang akan bertahan saat upgrade
  stable var myData : Nat = 0;

  // Fungsi public untuk increment data
  public func increment() : async Nat {
    myData += 1;
    myData;
  };

  // Fungsi untuk mendapatkan nilai saat ini
  public query func getValue() : async Nat {
    myData;
  };

  // Fungsi untuk reset nilai
  public func reset() : async Nat {
    myData := 0;
    myData;
  };

  // Fungsi untuk set nilai tertentu
  public func setValue(newValue : Nat) : async Nat {
    myData := newValue;
    myData;
  };
}