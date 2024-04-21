const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='py-4'>
      <div className='container mx-auto px-4'>
        <p className='text-center'>
          &copy; {currentYear} Dapo 1291. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
