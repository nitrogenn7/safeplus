import Link from 'next/link';


export default function Home() {
  return (
    <div className="space-y-6">
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold">SafePlus</h2>
        <p className="mt-3 max-w-2xl mx-auto">Scan suspicious messages, learn social engineering tactics, and earn a certificate for your team.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/scanner" className="px-4 py-2 border rounded">Scan a Message</Link>
          <Link href="/courses" className="px-4 py-2 bg-black text-white rounded">Take Course</Link>
        </div>
      </section>


      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">Fast Scanner</div>
        <div className="p-4 border rounded">Mini-Courses</div>
        <div className="p-4 border rounded">Certificate</div>
      </section>
    </div>
  );
}