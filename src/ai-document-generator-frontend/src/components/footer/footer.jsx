import React from 'react';
import "remixicon/fonts/remixicon.css";

const Footer = () => {
    return (
        <>
            <footer className="bg-black  text-white p-10 flex flex-wrap justify-between gap-5">
                {/* Bagian Media Sosial */}
                <div className="min-w-[250px]">
                    <h3 className="text-xl mb-4 border-b-2 border-gray-400 inline-block pb-1">Social Media</h3>
                    <div className="flex gap-4">
                    <a
                            href="https://github.com/farhanalfatih"
                            aria-label="github"
                            className="w-10 h-10 bg-gray-700 flex items-center justify-center
                             rounded-full text-white text-lg hover:bg-gray-800 transition-colors"
                        >
                           <i className="ri-github-line"></i>
                        </a>
                        <a
                            href="https://www.tiktok.com/@allnaaaaaaa"
                            aria-label="TIKTOK"
                           className="w-10 h-10 bg-gray-700 flex items-center justify-center
                             rounded-full text-white text-lg hover:bg-gray-800 transition-colors"
                        >
                            <i className="ri-tiktok-fill"></i>
                        </a>
                        <a
                            href="https://x.com/Kodee_kuu"
                            aria-label="Twitter"
                           className="w-10 h-10 bg-gray-700 flex items-center justify-center
                             rounded-full text-white text-lg hover:bg-gray-800 transition-colors"
                        >
                            <i className="ri-twitter-line"></i>
                        </a>
                        <a
                            href="https://www.instagram.com/aalnaaaaaa/"
                            aria-label="Instagram"
                            className="w-10 h-10 bg-gray-700 flex items-center justify-center
                             rounded-full text-white text-lg hover:bg-gray-800 transition-colors"
                        >
                            <i className="ri-instagram-line"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/farhan-alfatih/"
                            aria-label="LinkedIn"
                            className="w-10 h-10 bg-gray-700 flex items-center justify-center
                             rounded-full text-white text-lg hover:bg-gray-800 transition-colors"
                        >
                            <i className="ri-linkedin-line"></i>
                        </a>
                    </div>
                </div>

                {/* Bagian Informasi Kontak */}
                <div className="min-w-[250px]">
                    <h3 className="text-xl mb-4 border-b-2 border-gray-400 inline-block pb-1">Contact</h3>
                    <p className="text-sm  mb-2">Indonesia</p>
                    <p className="text-sm  mb-2">alfatihf504@gmail.com</p>
                </div>

                {/* Bagian Kosong (Placeholder) */}
                <div className="min-w-[250px]"></div>
            </footer>

            {/* Bagian Copyright */}
            <div className=" bg-black  text-white text-center text-xs py-3">
                Copyright &copy;AI-DOC-CHAIN
            </div>
        </>
    );
};

export default Footer;
