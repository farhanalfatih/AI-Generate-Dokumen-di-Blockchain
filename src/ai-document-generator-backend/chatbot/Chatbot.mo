import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Text "mo:base/Text";

persistent actor Chatbot {
    // Simpan riwayat chat
    private stable var history : [(Text, Text)] = [];

    // Fungsi untuk mengecek apakah pesan mengandung kata tertentu
    private func contains(text: Text, word: Text) : Bool {
        Text.contains(text, #text word)
    };

    // Fungsi utama chat
    public func chat(prompt: Text) : async Text {
        // Buat pesan menjadi lowercase untuk pengecekan
        let lowerPrompt = Text.toLowercase(prompt);
        
        // Tentukan respon berdasarkan input
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
}