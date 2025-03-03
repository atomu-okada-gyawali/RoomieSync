import SequelizeMock from 'sequelize-mock'; // Ensure correct import
import Room from "../model/room/Room";

const DBMock = new SequelizeMock();
const RoomMock = DBMock.define("Room", {
  Id: 1,
  Name: "Test Room",
});

describe("Room Model", () => {
  it("should create a new room with all values", async () => {
    const room = await RoomMock.create({
      Id: 1,
      Name: "Test Room",
    });
    expect(room.Id).toBe(1);
    expect(room.Name).toBe("Test Room");
  });

});
