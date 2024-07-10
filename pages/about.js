import React, { useState, useEffect } from "react";

// INTERNAL IMPORT
import { Header, Footer, Notification, Filter, Loader, Card } from "../Components";
import { useStateContext } from "../Context/NFTs";

const about = () => {
    // STATE VARIABLE
    const { loading, getNFTsByCreator, address, contract, getNFTsByCreatorAPI} = useStateContext();
    const [notification, setNotification] = useState("");
    const [allImages, setAllImages] = useState([]);
    const [activeSelect, setActiveSelect] = useState("Old Images");
    const [imagesCopy, setImagesCopy] = useState([]);
    // GET DATA
    const oldImages = [];
    const fetchImages = async () => {
        const images = await getNFTsByCreator(address);
        setAllImages(images);

        // API NFTs
        const apiImages = await getNFTsByCreatorAPI();
    };

    useEffect(() => {
        if (contract) fetchImages();
    }, [address, contract]);

    if (allImages.length == 0) {
        console.log("Loading");
    } else {
        allImages.map((el) => oldImages.push(el));
    }

    return (
        <div className="home">
            <Header notification={notification} setNotification={setNotification} />
            {/* CARD */}
            {allImages.length == 0 ? (
                <Loader />
            ) : allImages == undefined ? (
                <h1>No images</h1>
            ) : (
                <>
                <Filter
                    setImagesCopy={setImagesCopy}
                    imagesCopy={imagesCopy}
                    setAllImages={setAllImages}
                    allImages={allImages}
                    oldImages={oldImages}
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                />
                <div className="card">
                    {allImages.map((image, i) => (
                    <Card
                        key={i + 1}
                        index={i}
                        image={image}
                        setNotification={setNotification}
                    />
                    ))}
                </div>
                </>
            )}
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
