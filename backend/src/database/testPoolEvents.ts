import pool from "./index";

async function testPoolEvents() {
  try {
    // Test pool events
    console.log("🔄 Starting pool events test...\n");

    // Listen for connection events
    pool.on("connect", (client) => {
      console.log("✨ Event: New client connected to pool");
    });

    pool.on("acquire", (client) => {
      console.log("🔵 Event: Client acquired from pool");
    });

    pool.on("release", (error, client) => {
      console.log("⚪ Event: Client released back to pool");
    });

    pool.on("error", (err, client) => {
      console.error("🔴 Event: Pool error:", err.message);
    });

    pool.on("remove", (client) => {
      console.log("🔸 Event: Client removed from pool");
    });

    // Test 1: Simple query to trigger acquire/release
    console.log("\n📝 Test 1: Running simple query...");
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Query result:", result.rows[0].now);

    // Test 2: Multiple parallel queries to see pool in action
    console.log("\n📝 Test 2: Running parallel queries...");
    const promises = Array(3)
      .fill(0)
      .map(() => pool.query("SELECT pg_sleep(1), NOW() as time"));
    const results = await Promise.all(promises);
    console.log("✅ Parallel queries completed");

    // Test 3: Trigger an error (intentionally)
    console.log("\n📝 Test 3: Testing error handling...");
    try {
      await pool.query("SELECT * FROM non_existent_table");
    } catch (err) {
      console.log("✅ Error caught as expected");
    }
  } catch (err) {
    console.error("❌ Test failed:", err);
  } finally {
    // Clean up
    console.log("\n🧹 Cleaning up...");
    await pool.end();
    console.log("✨ Pool closed");
  }
}

// Run the tests
testPoolEvents().catch(console.error);
