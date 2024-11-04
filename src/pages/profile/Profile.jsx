import './Profile.css'
import assets from '../../assets/assets'

const Profile = () => {
  return (
    <div className='profile'>
      <div className="profile-container">
        <form >
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input type="file" id="avatar" accept='.png,.jpg,.jpeg' hidden/>
            <img src={assets.avatar_icon} alt="" />
            Upload profile picture
          </label>
          <input type="text" placeholder='Your name' required />
          <textarea placeholder='Write profile bio' required></textarea>
          <button type='submit'>Save</button>
        </form>
        <img src={assets.logo_icon} alt="" className='profile-pic'/>
      </div>
    </div>
  )
}

export default Profile