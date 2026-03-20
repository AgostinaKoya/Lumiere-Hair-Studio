
export class Logout{
    static async logout(req, res){
        res.clearCookie("access_token").json({ message: "Logout successful" });
    }
}