import "./profile.css";
import assets from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
import { AppContext } from "../../context/AppContext";

const Profile = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const navigate = useNavigate();
  const { setUserData } = useContext(AppContext);

  const porfileUpdate = async (event) => {
    console.log("Profile upadte");
    event.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error("Please upload a profile picture");
      }
      const docRef = doc(db, "users", uid);
      if (image) {
        const imageUrl = await upload(image);
        setPrevImage(imageUrl);
        await updateDoc(docRef, { avatar: imageUrl, bio: bio, name: name });
      } else {
        await updateDoc(docRef, { bio: bio, name: name });
      }
      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate("/chat");
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };
  useEffect(() => {
    console.log("Profile use");
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }
        if (docSnap.data().bio) {
          setBio(docSnap.data().bio);
        }
        if (docSnap.data().avatar) {
          setPrevImage(docSnap.data().avatar);
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={porfileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt=""
            />
            Upload profile picture
          </label>
          <input
            type="text"
            placeholder="Your name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <textarea
            placeholder="Write profile bio"
            required
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          ></textarea>
          <button type="submit">Save</button>
        </form>
        <img
          src={image ? URL.createObjectURL(image) : prevImage? prevImage:assets.logo_icon}
          alt=""
          className="profile-pic"
        />
      </div>
    </div>
  );
};

export default Profile;
