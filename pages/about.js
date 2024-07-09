import React, { useState, useEffect } from "react";

// INTERNAL IMPORT
import { Header, Footer, Notification, Comment, Loader, Card } from "../Components";
import { useStateContext } from "../Context/NFTs";

const about = () => {
    // STATE VARIABLE
    const { loading, getNFTsByCreatorAPI, address } = useStateContext();
    const [notification, setNotification] = useState("");
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        const fetchNFTs = async () => {
            if (address) {
                // try {
                    console.log("address:", address);
                    const response = await getNFTsByCreatorAPI(address);
                    console.log("Fetched NFTs:", response); // Log the response
                    // setNfts(response.data.data);
                // } catch (error) {
                //     console.error("Error fetching NFTs:", error); // Log the error
                //     setNotification("Failed to fetch NFTs");
                // }
            }
        };

        fetchNFTs();
    }, [address, getNFTsByCreatorAPI]);

    return (
        <div className="home">
            <Header notification={notification} setNotification={setNotification} />
            {/* <Comment /> */}
            {nfts.map((nft, i) => (
                <Card
                    key={i + 1}
                    index={i}
                    image={nft}
                    setNotification={setNotification}
                />
            ))}
            <Footer />
            {/* // NOTIDICATION */}
            {notification != "" && (
                <Notification notification={notification} setNotification={setNotification} />
            )}
            {/* // LOADER */}
            {loading && (
                <div className="loader">
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default about;
