const fetchData = async () => {
  try {
    const result = await fetch(`${process.env.REACT_APP_API_URL}/getData`);
    const data = await result.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

fetchData();

const app = () => {
  return <p>kia ora</p>;
};

export default app;
