const HomePage = () => {
  const googleAuth = () => {
    window.open('http://localhost:8000/api/users/auth/google', '_self');
  };
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={googleAuth}>Google Auth</button>
    </div>
  );
};

export default HomePage;
