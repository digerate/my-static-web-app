module.exports = async function (context, req) {
    context.res = {
        status: 200, // Open the connection
        isRaw: true, // Enable raw response
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
        body: null,
    };

    // Keep the connection open and send a message every second
    const intervalId = setInterval(() => {
        context.res.write(`data: ${new Date().toISOString()}\n\n`);
    }, 1000);

    // Close the connection after 60 seconds
    setTimeout(() => {
        clearInterval(intervalId);
        context.res.end();
    }, 60000);
};
