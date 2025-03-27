const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'tracking-producer-nestedJSON',
  brokers: ['my-cluster-kafka-bootstrap.kafka.svc:9092'],
  sasl: {
    mechanism: "scram-sha-512",
    username:  "2s6yyuuj7ti9xyey9xkrk9wg3", // Use env variable for security
    password:  "aGJVMV90LS4OWLZCiWd0ZLnS0oaBT8At",
  }
});

const producer = kafka.producer();
const topic = process.env.KAFKA_TOPIC ;
const key = 'static-key'; // Define key to avoid ReferenceError

function getVehicleTrackingJson() {
  const now = new Date();
  const istTime = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false });

  return {
    vehicleID: `VEHICLE-${Math.floor(Math.random() * 5) + 1}`,
    speed: Math.floor(Math.random() * 120), // Random speed between 0-120 km/h
    fuelLevel: Math.floor(Math.random() * 100), // Random fuel level between 0-100%
    latitude: (Math.random() * 180 - 90).toFixed(6), // Random latitude
    longitude: (Math.random() * 360 - 180).toFixed(6), // Random longitude
    engineTemp: Math.floor(Math.random() * (120 - 70) + 70),
    timestamp: istTime
  };
}

  async function sendMessage() {
    await producer.connect();
    console.log('Producer connected');
    
    setInterval(async () => {
      const value = getVehicleTrackingJson();
      await producer.send({
        topic,
        messages: [
          { key, value: JSON.stringify(value) }
        ]
      });
      console.log('Message sent:', value);
    }, 3000); // Sending message every 3 seconds
  }
  
  sendMessage().catch(console.error);