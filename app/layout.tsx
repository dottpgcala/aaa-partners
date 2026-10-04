import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "AAA Partners | Consulenza, previdenza e patrimonio in Svizzera", description: "Cassa malati, secondo e terzo pilastro, wealth management, oro e immobili. Un approccio integrato, supportato dall’intelligenza artificiale. Richiedi un colloquio.", robots:{index:true,follow:true}, openGraph:{title:"AAA Partners — Le tue scelte, una visione d’insieme.",description:"Consulenza assicurativa, previdenziale e patrimoniale in Svizzera.",locale:"it_CH",type:"website"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="it-CH"><body>{children}</body></html>}
