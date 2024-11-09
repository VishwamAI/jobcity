import TestIntegration from '../components/TestIntegration';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">JobCity Integration Test</h1>
      <TestIntegration />
    </main>
  );
}
