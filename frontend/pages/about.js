// pages/about.js

import Link from 'next/link';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-x-8"
            >
                <div className="md:w-1/2">
                    <Image src="https://source.unsplash.com/1600x1000/?books,about" alt="About BookishHub" width={1600} height={1000} className="rounded-lg shadow-lg" />
                </div>
                <div className=" md:w-1/2 max-w-3xl mx-auto">
                    <h1 className="text-3xl font-semibold mb-4">About BookishHub</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        {`Welcome to BookishHub, your ultimate destination for all things related to books! Whether you're an avid reader, a casual bookworm, or just looking for your next literary adventure, BookishHub has something for everyone.
`}                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        {`Our mission at BookishHub is to create a thriving community of book lovers where you can discover new books, share your thoughts, and connect with fellow bibliophiles from around the world. With an extensive collection of book reviews, recommendations, and discussions, BookishHub is your go-to platform for everything book-related.`}
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        {`At BookishHub, we believe that books have the power to inspire, educate, and entertain. Whether you're passionate about fiction, non-fiction, romance, mystery, science fiction, or any other genre, you'll find a wealth of resources and information to satisfy your literary cravings.`}
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        {`In addition to providing valuable content and resources, BookishHub also offers a range of interactive features and tools to enhance your reading experience. From personalized reading lists and book clubs to author interviews and virtual events, there's always something exciting happening at BookishHub.`}
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        {`Join us on this literary journey and discover the magic of books with BookishHub. Whether you're a seasoned bookworm or just starting your reading adventure, you'll find everything you need to indulge your passion for books and connect with like-minded individuals who share your love of reading.`}
                    </p>
                    <div className="text-lg text-gray-700 mb-6">
                        Ready to dive in? <Link href="/category" className="text-blue-600 hover:underline">Start exploring</Link> now!
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutPage;
