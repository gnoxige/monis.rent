import Configurator from "@/components/configurator";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  return <Configurator searchParams={params} />;
}
