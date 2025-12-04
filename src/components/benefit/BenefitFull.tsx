export default function BenefitFull({ data }: { data: any }) {
  return (
    <div class="flex w-full">
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}
