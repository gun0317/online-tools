import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FaDownload } from 'react-icons/fa';

export default function Concatenator() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [pdfFile1, setPdfFile1] = useState(null);
    const [pdfFile2, setPdfFile2] = useState(null);

    async function handleConcatenatePDFs() {
        setIsProcessing(true);

        const pdf1 = await pdfFile1.arrayBuffer();
        const pdf2 = await pdfFile2.arrayBuffer();

        const pdfDoc1 = await PDFDocument.load(pdf1);
        const pdfDoc2 = await PDFDocument.load(pdf2);

        const mergedPdf = await PDFDocument.create();
        const [pdf1Pages, pdf2Pages] = await Promise.all([
            mergedPdf.copyPages(pdfDoc1, pdfDoc1.getPageIndices()),
            mergedPdf.copyPages(pdfDoc2, pdfDoc2.getPageIndices()),
        ]);

        pdf1Pages.forEach((page) => mergedPdf.addPage(page));
        pdf2Pages.forEach((page) => mergedPdf.addPage(page));

        const mergedPdfFile = await mergedPdf.save();

        const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'merged.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setIsProcessing(false);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Concatenate PDFs</h1>
                <div className="flex flex-col space-y-2">
                    <div>
                        <label htmlFor="pdf-file-1" className="font-bold mb-1 block">
                            PDF File 1:
                        </label>
                        <input
                            type="file"
                            id="pdf-file-1"
                            accept=".pdf"
                            onChange={(e) => setPdfFile1(e.target.files[0])}
                        />
                    </div>
                    <div>
                        <label htmlFor="pdf-file-2" className="font-bold mb-1 block">
                            PDF File 2:
                        </label>
                        <input
                            type="file"
                            id="pdf-file-2"
                            accept=".pdf"
                            onChange={(e) => setPdfFile2(e.target.files[0])}
                        />
                    </div>
                </div>
                <br/>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleConcatenatePDFs}
                    disabled={!pdfFile1 || !pdfFile2 || isProcessing}
                >
                    {isProcessing ? 'Processing...' : 'Concatenate PDFs'}
                    <FaDownload className="inline-block ml-2" />
                </button>
            </div>
        </div>
    );
}
