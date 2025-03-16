
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from "@/components/ui/separator";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ShoppingBag, AlertCircle, Lock, CheckCircle } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // التحقق من أن URL يحتوي على المعلومات المطلوبة
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (!hashParams.get('access_token')) {
      setErrorMessage('رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (password !== confirmPassword) {
      setErrorMessage('كلمتا المرور غير متطابقتين');
      return;
    }
    
    if (password.length < 6) {
      setErrorMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) throw error;
      
      setIsSuccess(true);
      toast({
        title: "تم تغيير كلمة المرور بنجاح",
        description: "يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة"
      });
    } catch (error: any) {
      console.error('خطأ في تحديث كلمة المرور:', error);
      setErrorMessage(error.message || 'فشل تحديث كلمة المرور، يرجى المحاولة مرة أخرى');
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
          <CardHeader className="flex flex-col items-center space-y-1">
            <div className="w-16 h-16 bg-bluesky-50 rounded-full flex items-center justify-center mb-2">
              <Lock className="h-8 w-8 text-bluesky-600" />
            </div>
            <CardTitle className="text-2xl">تعيين كلمة مرور جديدة</CardTitle>
            <CardDescription>
              أدخل كلمة المرور الجديدة لحسابك
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isSuccess ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-green-700 mb-2">تم تغيير كلمة المرور بنجاح!</h3>
                <p className="text-gray-600 mb-4">
                  تم تغيير كلمة المرور الخاصة بك بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.
                </p>
                <Button 
                  className="mx-auto mt-2 bg-gradient-to-r from-bluesky-600 to-bluesky-700 hover:from-bluesky-700 hover:to-bluesky-800"
                  onClick={() => navigate('/signin')}
                >
                  تسجيل الدخول
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور الجديدة</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      dir="ltr"
                      placeholder="أدخل كلمة المرور الجديدة"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="confirm-password"
                      type="password"
                      dir="ltr"
                      placeholder="أدخل كلمة المرور مرة أخرى"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                  {isLoading ? 'جارِ التحديث...' : 'تعيين كلمة المرور الجديدة'}
                </Button>
              </form>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <Separator className="my-4" />
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => navigate('/signin')}
                className="text-sm text-bluesky-700 hover:text-bluesky-800"
              >
                العودة لتسجيل الدخول
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
