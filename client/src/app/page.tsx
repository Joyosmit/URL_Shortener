'use client'
import { useState } from "react";

export default function Home() {
    const [url, setUrl] = useState<string>('');
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        try {
          const response = await fetch('https://url-shortener-ymz7.onrender.com/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ originalUrl:url }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          // Handle successful response
          console.log('URL submitted successfully');
        } catch (error) {
          // Handle error
          console.error('Error submitting URL:', error);
        }
      };
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-xl font-semibold mb-4">Submit a URL</h2>
                <div className="mb-4">
                    <label htmlFor="url" className="block text-gray-700 mb-2">
                        URL
                    </label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </form>
        </main>
    );
}
