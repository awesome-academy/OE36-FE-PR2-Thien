export default function validateAmount(regularNumber, VIPNumber, seatsAvailable) {
  return (
    regularNumber >= 0 && VIPNumber >= 0 && regularNumber + VIPNumber <= 10 && regularNumber + VIPNumber <= seatsAvailable
  );
}
