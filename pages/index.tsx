import Head from 'next/head'
import { FaFilePdf } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Index({props}) {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{`HOME`}</title>
            </Head>
            <div>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                        <button
                            onClick={() => router.push('/concat')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            PDF Concatenator
                            <FaFilePdf className="inline-block ml-2"/> +<FaFilePdf className="inline-block ml-2"/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

