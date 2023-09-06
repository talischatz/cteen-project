import DoingGoodForm from '@/components/doing-good/DoingGoodForm';

export default function DoingGoodPage() {
  return (
    <div className="full-container flex flex-col">
      <div className="text-4xl text-primary font-semibold mt-8 text-center">
        Doing Good
      </div>
      <DoingGoodForm />
    </div>
  );
}
