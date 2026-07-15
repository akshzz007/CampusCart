import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer")
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const token = authHeader.split(" ")[1];

   console.log("Authorization Header:", authHeader);
console.log("JWT Secret:", process.env.JWT_SECRET);

try {
console.log("========== AUTH MIDDLEWARE ==========");
console.log("Authorization Header:", authHeader);
console.log("Token:", token);
console.log("JWT Secret:", process.env.JWT_SECRET);

try {

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  console.log("Decoded User:", decoded);

  req.user = decoded;

  next();

} catch (err) {

  console.log("JWT ERROR:", err);
  console.log("JWT ERROR MESSAGE:", err.message);

  return res.status(401).json({
    success: false,
    message: err.message,
  });

}
} catch (err) {
  console.log("JWT ERROR:", err.message);

  return res.status(401).json({
    success: false,
    message: err.message,
  });
}
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default protect;