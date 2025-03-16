import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowLeft, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_COVER_IMAGE } from '@/components/StoreHeader';

type AuthMode = 'login' | 'register' | 'forgot-password';

interface StoreAuthProps {
  mode?: AuthMode;
}

const StoreAuth: React.FC<StoreAuthProps> = ({ mode = 'login' }) => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(mode === 'register' ? 'register' : 'login');
  
  // Fetch store data
  const { data: storeData, isLoading: isLoadingStore } = useQuery({
    queryKey: ['store-auth', handle],
    queryFn: async () => {
      if (!handle) throw new Error('معرف المتجر غير موجود');
      
      const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
      const { data, error } = await supabase
        .from('stores')
        .select('name, logo_url, cover_url, handle, custom_color, use_custom_colors')
        .eq('handle', cleanHandle)
        .single();
      
      if (error) throw error;
      return data;
    },
    meta: {
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "خطأ في تحميل بيانات المتجر",
          description: error.message
        });
      }
    }
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بعودتك إلى المتجر!"
      });
      
      // Redirect back to store
      navigate(`/${handle?.replace('@', '')}`);
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول:', error);
      setErrorMessage(error.message || 'فشل تسجيل الدخول، يرجى المحاولة مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    
    if (!fullName) {
      setErrorMessage('يرجى إدخال الاسم الكامل');
      setIsLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك"
      });
      
      // Switch to login tab after successful registration
      setActiveTab('login');
    } catch (error: any) {
      console.error('خطأ في إنشاء الحساب:', error);
      setErrorMessage(error.message || 'فشل إنشاء الحساب، يرجى المحاولة مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${handle?.replace('@', '')}/reset-password`,
      });
      
      if (error) throw error;
      
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
  
  const getMainColor = () => {
    if (storeData?.use_custom_colors && storeData?.custom_color) {
      return storeData.custom_color;
    }
    return '#4B5563'; // Default color
  };
  
  if (isLoadingStore) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  const mainColor = getMainColor();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Store Header Background */}
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${storeData?.cover_url || DEFAULT_COVER_IMAGE})` 
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <Link 
            to={`/${handle?.replace('@', '')}`} 
            className="flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>العودة للمتجر</span>
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-16 mb-10 z-10">
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader className="flex flex-col items-center space-y-2 pb-2">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white mb-2 bg-white flex items-center justify-center">
              {storeData?.logo_url ? (
                <img 
                  src={storeData.logo_url} 
                  alt={`${storeData.name} logo`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <ShoppingBag className="h-10 w-10 text-gray-500" />
              )}
            </div>
            <CardTitle className="text-xl">{storeData?.name || 'المتجر'}</CardTitle>
            <CardDescription>
              {mode === 'login' ? 'تسجيل الدخول إلى حسابك' : 
               mode === 'register' ? 'إنشاء حساب جديد' : 
               'إعادة تعيين كلمة المرور'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4">
            {mode === 'forgot-password' ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
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
                  className="w-full"
                  style={{ 
                    backgroundColor: mainColor,
                    borderColor: mainColor,
                    '--tw-ring-color': `${mainColor}80` // Adding transparency for the ring
                  } as React.CSSProperties}
                  disabled={isLoading}
                >
                  {isLoading ? 'جارِ الإرسال...' : 'إرسال رابط إعادة التعيين'}
                </Button>
                
                <div className="text-center">
                  <Button
                    variant="link"
                    onClick={() => navigate(`/${handle?.replace('@', '')}/login`)}
                    className="text-sm"
                  >
                    العودة لتسجيل الدخول
                  </Button>
                </div>
              </form>
            ) : (
              <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                  <TabsTrigger value="register">حساب جديد</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="pt-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">البريد الإلكتروني</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="login-email"
                          type="email"
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
                        <Label htmlFor="login-password">كلمة المرور</Label>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-xs"
                          onClick={() => navigate(`/${handle?.replace('@', '')}/forgot-password`)}
                        >
                          نسيت كلمة المرور؟
                        </Button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="كلمة المرور"
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
                      className="w-full"
                      style={{ 
                        backgroundColor: mainColor,
                        borderColor: mainColor,
                        '--tw-ring-color': `${mainColor}80` // Adding transparency for the ring
                      } as React.CSSProperties}
                      disabled={isLoading}
                    >
                      {isLoading ? 'جارِ تسجيل الدخول...' : 'تسجيل الدخول'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register" className="pt-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">الاسم الكامل</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="أدخل اسمك الكامل"
                          className="pl-10"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email">البريد الإلكتروني</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="أدخل بريدك الإلكتروني"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">كلمة المرور</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="أدخل كلمة مرور قوية"
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
                      className="w-full"
                      style={{ 
                        backgroundColor: mainColor,
                        borderColor: mainColor,
                        '--tw-ring-color': `${mainColor}80` // Adding transparency for the ring
                      } as React.CSSProperties}
                      disabled={isLoading}
                    >
                      {isLoading ? 'جارِ إنشاء الحساب...' : 'إنشاء حساب جديد'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <Separator className="my-4" />
            <div className="text-center text-sm text-gray-500">
              بالاستمرار، فإنك توافق على <Link to="#" className="text-blue-600 hover:underline">شروط الاستخدام</Link> و <Link to="#" className="text-blue-600 hover:underline">سياسة الخصوصية</Link> الخاصة بالمتجر
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StoreAuth;
