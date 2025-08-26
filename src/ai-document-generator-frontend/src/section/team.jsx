import React from "react";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Orang from "../../public/orang.png";

const Team = () => {
  const members = [
    {
      name: "Farhan Alfatih",
      description: "Frontend Developer",
      img: Orang,
      socials: {
        instagram: "https://www.instagram.com/aalnaaaaaa/",
        linkedin: "https://www.linkedin.com/in/farhan-alfatih/",
        github: "https://github.com/farhanalfatih",
      },
    },
    {
      name: "Hikmawan Pola Parikesit",
      description: "(ai) developer",
      img: Orang,
      socials: {
        instagram: "https://www.instagram.com/wan.capture/",
        linkedin: "https://www.linkedin.com/in/hikmawan-polaparikesit/",
        github: "https://github.com/hikmawanpola ",
      },
    },
    {
      name: "Alvin Yusuf Riziq",
      description: "backend (ai) developer",
      img: Orang,
      socials: {
        instagram: "https://www.instagram.com/vlvyn_?igsh=YmN6bmJmaTUwNTRu",
        linkedin: "https://www.linkedin.com/in/alvin-yusuf-riziq/",
        github: "https://github.com/alvinyusuf",
      },
    },
    {
      name: "Arsya",
      description: "backend smart contract developer",
      img: Orang,
      socials: {
        instagram: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "rifqi",
      description: "backend developer",
      img: Orang,
      socials: {
        instagram: "#",
        linkedin: "#",
        github: "#",
      },
    },
  ];

  return (
    <section className="w-full py-16">
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-3xl font-bold mb-6 text-white">Meet Our Team</h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl">
          Meet the dedicated professionals behind our project. Each member
          brings unique expertise to deliver innovation and reliability.
        </p>
      </div>

      {/* Grid 3 kolom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {members.map((m) => (
          <div
            key={m.name}
            className="group relative overflow-hidden rounded-xl h-[22rem] shadow-lg"
          >
            {/* Foto Background */}
            <img
              src={m.img}
              alt={m.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />

            {/* Nama & Role → hanya muncul saat hover */}
            <div className="absolute bottom-4 left-4 text-left opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <h3 className="text-white font-semibold text-lg">{m.name}</h3>
              <p className="text-gray-300 text-sm">{m.description}</p>
            </div>

            {/* Social media → kanan bawah, muncul saat hover */}
            <div className="absolute bottom-4 right-4 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {m.socials?.instagram && (
                <a
                  href={m.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-white text-lg hover:text-pink-500 cursor-pointer" />
                </a>
              )}

              {m.socials?.linkedin && (
                <a
                  href={m.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-white text-lg hover:text-blue-600 cursor-pointer" />
                </a>
              )}
              {m.socials?.github && (
                <a
                  href={m.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-white text-lg hover:text-gray-300 cursor-pointer" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
