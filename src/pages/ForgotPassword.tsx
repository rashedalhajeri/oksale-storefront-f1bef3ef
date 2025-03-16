
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from "@/components/ui/separator";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, AlertCircle, Lock, ArrowRight, ShoppingBag } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSuccess(false);
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      setIsSuccess(true);
      toast({
        title: "تم إرسال رابط إعادة تعيين كلمة المرور",
        description: "يرجى التحقق من بريدك الإلكتروني"
      });
    } catch (error: any) {
      console.error('خطأ في إرسال رابط إعادة تعيين كلمة المرور:', error);
      setErrorMessage(error.message || 'فشل إرسال رابط إعادة تعيين كلمة المرور، يرجى المحاولة مرة أخرى');
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
            <CardTitle className="text-2xl">استعادة كلمة المرور</CardTitle>
            <CardDescription>
              سنرسل لك رابط إعادة تعيين كلمة المرور عبر البريد الإلكتروني
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isSuccess ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-green-700 mb-2">تم إرسال الرابط بنجاح!</h3>
                <p className="text-gray-600 mb-4">
                  تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. 
                  يرجى التحقق من صندوق الوارد الخاص بك واتباع التعليمات.
                </p>
                <Button 
                  variant="outline" 
                  className="mx-auto mt-2"
                  onClick={() => navigate('/signin')}
                >
                  العودة لتسجيل الدخول
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  {isLoading ? 'جارِ الإرسال...' : 'إرسال رابط إعادة التعيين'}
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

export default ForgotPassword;
