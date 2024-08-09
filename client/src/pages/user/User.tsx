import { useParams } from 'react-router-dom';

const User = () => {
  const { username } = useParams();
  return (
    <>
      {username}
    </>
  )
}

export default User