import React from "react";
import Image from "next/image";
// INTERNAL IMPORT
import Style from "./Comment.module.css";
import images from "../Image/client/index";

const Comment = () => {
    return (
        <div className={Style.postcontainer}>
            <div className={Style.postheader}>
                <Image
                    className={Style.profilepic}
                    src={images.client1}
                    width={80}
                    height={80}
                    onClick={() => setOpenProfile(true)}
                />
                <div className={Style.postinfo}>
                    <h3>Adam</h3>
                    <p>Shared publicly - Jan 2024</p>
                </div>
            </div>
            <div className={Style.postcontent}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
                </p>
            </div>
            <div className={Style.postactions}>
                <p>Like</p>
                <p>Comment</p>
                <p>Share</p>
            </div>
            <div className={Style.postheader}>
                <Image
                    className={Style.profilepic}
                    src={images.client1}
                    width={80}
                    height={80}
                    onClick={() => setOpenProfile(true)}
                />
                <div className={Style.postinfo}>
                    <h3>Eva</h3>
                    <p>Shared publicly - Jan 2024</p>
                </div>
            </div>
            <div className={Style.postcontent}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
                </p>
            </div>
            <div className={Style.postactions}>
                <p>Like</p>
                <p>Comment</p>
                <p>Share</p>
            </div>
            <div className={Style.commentsection}>
                <Image
                    className={Style.profilepic}
                    src={images.client1}
                    width={80}
                    height={80}
                    onClick={() => setOpenProfile(true)}
                />
                <textarea placeholder="Message"></textarea>
                <div className={Style.commentbuttons}>
                    <button className={Style.postbtn}>POST COMMENT</button>
                    <button className={Style.cancelbtn}>CANCEL</button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
