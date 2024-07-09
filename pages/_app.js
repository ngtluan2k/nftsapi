import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../Context/NFTs"

const chainId = ChainId.BinanceSmartChainTestnet;
const clientId = "6f1a680ae767757b0d4a0ab81b5eb209";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={chainId} clientId={clientId}>
      <StateContextProvider>
        <Component {...pageProps}/>
      </StateContextProvider>
    </ThirdwebProvider>
  );
}
