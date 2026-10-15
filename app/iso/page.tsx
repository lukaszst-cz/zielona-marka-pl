import { permanentRedirect } from "next/navigation";

// Short navigational alias. The canonical resource explains the ISO references.
export default function IsoAliasPage() {
  permanentRedirect("/standardy-jakosci#iso");
}
