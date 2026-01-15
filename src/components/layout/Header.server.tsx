import { getMenuLocations } from "@/lib/firestore-client";
import HeaderClient from "./Header.client";

export default async function Header() {
  const locations = await getMenuLocations();

  return <HeaderClient locations={locations} />;
}
