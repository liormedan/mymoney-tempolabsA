import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth";
import { FirebaseError } from "firebase/app";

const getErrorMessage = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "כתובת האימייל אינה תקינה";
    case "auth/user-disabled":
      return "המשתמש חסום";
    case "auth/user-not-found":
      return "משתמש לא נמצא";
    case "auth/wrong-password":
      return "סיסמה שגויה";
    case "auth/email-already-in-use":
      return "כתובת האימייל כבר בשימוש";
    case "auth/weak-password":
      return "הסיסמה חלשה מדי";
    default:
      return "שגיאה לא צפויה, נסה שוב";
  }
};

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp, loading } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success("התחברת בהצלחה", {
          description: "ברוך הבא!",
        });
      } else {
        await signUp(email, password);
        toast.success("נרשמת בהצלחה", {
          description: "ברוך הבא!",
        });
      }
      navigate("/");
    } catch (error) {
      const message =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : "שגיאה לא צפויה, נסה שוב";

      toast.error("שגיאה", {
        description: message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6 space-y-6 bg-card">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">
            {isLogin ? "התחברות" : "הרשמה"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLogin ? "הזן את פרטי ההתחברות שלך" : "צור חשבון חדש"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-right"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-right"
              minLength={6}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            variant="default"
          >
            {loading ? "טוען..." : isLogin ? "התחבר" : "הירשם"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">או</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full"
        >
          {isLogin ? "צור חשבון חדש" : "התחבר לחשבון קיים"}
        </Button>
      </Card>
    </div>
  );
};

export default Login;
