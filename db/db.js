import mongoose, { connect } from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://melissagh:CabinetDentaire@projetcabinet.31jea0i.mongodb.net/Estudent"
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};



export default connectToMongoDB;