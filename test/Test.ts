import assert from "assert";
import { 
  TestHelpers,
  ERC6551Account_CallExecuted
} from "generated";
const { MockDb, ERC6551Account } = TestHelpers;

describe("ERC6551Account contract CallExecuted event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for ERC6551Account contract CallExecuted event
  const event = ERC6551Account.CallExecuted.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("ERC6551Account_CallExecuted is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await ERC6551Account.CallExecuted.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualERC6551AccountCallExecuted = mockDbUpdated.entities.ERC6551Account_CallExecuted.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedERC6551AccountCallExecuted: ERC6551Account_CallExecuted = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      to: event.params.to,
      value: event.params.value,
      data: event.params.data,
      result: event.params.result,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualERC6551AccountCallExecuted, expectedERC6551AccountCallExecuted, "Actual ERC6551AccountCallExecuted should be the same as the expectedERC6551AccountCallExecuted");
  });
});
