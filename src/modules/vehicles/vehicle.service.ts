import { pool } from "../../config/db";

//create vehicles
const registerVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  //encrypting the password
  const result = await pool.query(
    `
        INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
        `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

// get all vehicles
const getAllVehicles = async () => {
  const result = await pool.query(`
     SELECT 
      id,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price::FLOAT AS daily_rent_price,
      availability_status
    FROM vehicles
        `);
  return result;
};

// get vehicle by id
const getSingleVehicles = async (id: string) => {
  const result = await pool.query(
    ` SELECT
      id,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price::FLOAT AS daily_rent_price,
      availability_status
    FROM vehicles
    WHERE id = $1
        `,
    [id]
  );
  return result;
};

// update a vehicle

const updateVehicle = async (payload: Record<string, unknown>, id: string) => {
  const { vehicle_name, type, registration_number, daily_rent_price } = payload;
  const result = await pool.query(
    `
        UPDATE vehicles SET
        vehicle_name = COALESCE($1, vehicle_name),
        type = COALESCE($2, type),
        registration_number = COALESCE($3, registration_number),
        daily_rent_price = COALESCE($4, daily_rent_price)
        WHERE id =$5
        RETURNING *
        `,
    [vehicle_name, type, registration_number, daily_rent_price, id]
  );
  return result;
};

//delete a vehicles

const deleteVehicle = async (id: string) => {
  const result = await pool.query(
    `
        DELETE FROM vehicles WHERE id = $1
        `,
    [id]
  );
  return result;
};

export const vehicleService = {
  registerVehicle,
  getAllVehicles,
  getSingleVehicles,
  updateVehicle,
  deleteVehicle,
};
