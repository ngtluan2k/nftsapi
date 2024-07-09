import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import {
    useAddress,
    useContract,
    useMetamask,
    useDisconnect,
    useSigner
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0x4347F77BCfa87d0734B2aa6e7B058446e021D465");
    const address = useAddress();
    const connect = useMetamask();

    // Frontend
    const disconnect = useDisconnect();
    const signer = useSigner();
    const [userBlance, setUserBlance] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            // User blance
            const balance = await signer?.getBalance();
            const userBalance = address ? ethers.utils.formatEther(balance?.toString()) : "";
            setUserBlance(userBalance);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Contract function
    // ---upload
    const uploadImage = async (imageInfo) => {
        const { title, description, email, category, image } = imageInfo;
        try {
            // Charge
            const listingPrice = await contract.call("listingPrice");
            const createNFTs = await contract.call(
                "uploadIPFS",
                [ address, image, title, description, email, category ],
                {
                    value: listingPrice.toString(),
                }
            );

            // Api call
            const response = await axios({
                method: "POST",
                url: `/api/v1/nfts`,
                data: {
                    title: title,
                    description: description,
                    category: category,
                    image: image,
                    address: address,
                    email: email,
                },
            });

            console.log(response);
            console.info("contract call success", createNFTs);
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.error("contract call failure", error);
        }
    };

    // ---Get contract data
    const getUploadedImages = async () => {
        // All images
        const images = await contract.call("getAllNFTs");

        // Total upload
        const totalUpload = await contract.call("imagesCount");
        
        // Listing price
        const listingPrice = await contract.call("listingPrice");
        const allImages = images.map((images, i) => ({
            owner: images.creator,
            title: images.title,
            description: images.description,
            email: images.email,
            category: images.category,
            fundraised: images.fundraised,
            image: images.image,
            imageID: images.id.toNumber(),
            createdAt: images.timestamp.toNumber(),
            listedAmount: ethers.utils.formatEther(listingPrice.toString()),
            totalUpload: totalUpload.toNumber(),
        }))

        return allImages;
    };

    //--- Get single image
    const singleImage = async (id) => {
        try {
            const data = await contract.call("getImage", [id]);
            const image = {
                title: data[0],
                description: data[1],
                email: data[2],
                category: data[3],
                fundRaised: ethers.utils.formatEther(data[4].toString()),
                creator: data[5],
                imageURL: data[6],
                createdAt: data[7].toNumber(),
                imageId: data[8].toNumber(),
            };

            return image;
        } catch (error) {
            console.log(error);
        };
    };

    // Donate
    const donateFund = async ({ amount, Id }) => {
        try {
            console.log(amount, Id);
            const transaction = await contract.call("donateToImage", [Id], {
                value: amount.toString(),
            });
            console.log(transaction);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    //Get api data
    const getAllNftsAPI = async () => {
        const response = await axios({
            method: "GET",
            url: `/api/v1/nfts`,
        });
        console.log(response);
    };

    //Get by creator api data
    const getNFTsByCreatorAPI = async (address) => {
        const response = await axios({
            method: "GET",
            url: `/api/v1/nfts/nftByCreator/${address}`,
        });
        console.log(response.data);
    };

    // Single NFTS api
    const getSingleNftsAPI = async (id) =>  {
        const response = await axios({
            method: "GET",
            url: `/api/v1/nfts/${id}`,
        });
        console.log(response);
    }

    return (
        <StateContext.Provider 
        value={{ 
            // Contract
            address,
            contract,
            connect,
            disconnect,
            userBlance,
            setLoading,
            loading,
            // Function
            uploadImage,
            getUploadedImages,
            donateFund,
            singleImage,
            // API
            getAllNftsAPI,
            getNFTsByCreatorAPI,
            getSingleNftsAPI,
         }}>{
            children
         }</StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
