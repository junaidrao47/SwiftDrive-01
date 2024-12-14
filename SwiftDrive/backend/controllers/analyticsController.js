exports.getAnalytics = async (req, res) => {
    try {
        // Example: Fetch analytics data
        const data = {
            totalUsers: 1000,
            activeBookings: 120,
            revenue: 50000,
        };
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching analytics', error });
    }
};
