
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Lock, AlertCircle, ShoppingBag } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // التحقق إذا كان المستخدم قد سجل دخوله بالفعل
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.session) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "جاري تحويلك للوحة التحكم"
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول:', error);
      setErrorMessage('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-bluesky-50 to-purple-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center gap-2">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-10 h-10 bg-gradient-to-r from-bluesky-500 to-purple-500 rounded-lg opacity-70 blur-sm"></div>
                <ShoppingBag className="h-8 w-8 text-white relative z-10" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-bluesky-600 to-bluesky-950">OK</span>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">sale</span>
              </div>
            </div>
          </Link>
        </div>
  
        <Card className="border-bluesky-100 shadow-xl backdrop-blur-sm bg-white/90">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
            <CardDescription>
              مرحباً بك مجدداً، سجل دخولك للوصول إلى متجرك
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    dir="ltr"
                    placeholder="أدخل بريدك الإلكتروني"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-xs text-bluesky-600 hover:text-bluesky-800 transition-colors"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    dir="ltr"
                    placeholder="أدخل كلمة المرور"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-bluesky-600 to-bluesky-700 hover:from-bluesky-700 hover:to-bluesky-800"
                disabled={isLoading}
              >
                {isLoading ? 'جارِ تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <Separator className="my-4" />
            <p className="text-center text-sm text-gray-500">
              ليس لديك حساب؟{' '}
              <Link to="/signup" className="text-bluesky-600 hover:text-bluesky-800 font-medium">
                إنشاء حساب جديد
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
