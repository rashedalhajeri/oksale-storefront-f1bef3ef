
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { PlusCircle, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { 
  getAvailablePlatforms, 
  getSocialUrl, 
  getHelperText, 
  getPlaceholder,
  type SocialMediaType 
} from '@/utils/socialMediaUtils';

interface SocialMediaAccount {
  id: string;
  type: SocialMediaType;
  username: string;
}

interface SocialMediaSectionProps {
  storeInfo: {
    instagram: string;
    twitter: string;
    facebook: string;
    website: string;
    snapchat?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  storeInfo,
  handleInputChange
}) => {
  const { toast } = useToast();
  
  const [accounts, setAccounts] = useState<SocialMediaAccount[]>(() => {
    const initialAccounts: SocialMediaAccount[] = [];
    
    const addIfExists = (type: SocialMediaType, value?: string) => {
      if (value) {
        initialAccounts.push({ id: type, type, username: value });
      }
    };
    
    addIfExists('instagram', storeInfo.instagram);
    addIfExists('twitter', storeInfo.twitter);
    addIfExists('facebook', storeInfo.facebook);
    addIfExists('website', storeInfo.website);
    addIfExists('snapchat', storeInfo.snapchat);
    addIfExists('tiktok', storeInfo.tiktok);
    addIfExists('whatsapp', storeInfo.whatsapp);
    
    return initialAccounts;
  });
  
  const [newAccount, setNewAccount] = useState<{type: SocialMediaType | ''; username: string}>({
    type: '',
    username: ''
  });
  
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'select' | 'input'>('select');
  const [maxAccountsReached, setMaxAccountsReached] = useState(false);

  // Change the limit from 4 to 3
  useEffect(() => {
    setMaxAccountsReached(accounts.length >= 3);
  }, [accounts]);

  const handleAddAccount = () => {
    if (newAccount.type && newAccount.username) {
      const updatedAccounts = [...accounts];
      const existingIndex = updatedAccounts.findIndex(account => account.type === newAccount.type);
      
      if (existingIndex !== -1) {
        updatedAccounts[existingIndex] = {
          ...updatedAccounts[existingIndex],
          username: newAccount.username
        };
      } else {
        // Change the limit from 4 to 3
        if (updatedAccounts.length >= 3) {
          toast({
            title: "الحد الأقصى تم الوصول إليه",
            description: "يمكنك إضافة 3 حسابات كحد أقصى",
            variant: "destructive"
          });
          setOpen(false);
          return;
        }
        
        updatedAccounts.push({
          id: newAccount.type,
          type: newAccount.type as SocialMediaType,
          username: newAccount.username
        });
      }
      
      setAccounts(updatedAccounts);
      
      const e = {
        target: {
          id: `social-${newAccount.type}`,
          value: newAccount.username
        }
      } as React.ChangeEvent<HTMLInputElement>;
      handleInputChange(e);
      
      setOpen(false);
      setStep('select');
      setNewAccount({ type: '', username: '' });
    }
  };

  const handleRemoveAccount = (type: string) => {
    const updatedAccounts = accounts.filter(account => account.type !== type);
    setAccounts(updatedAccounts);
    
    const e = {
      target: {
        id: `social-${type}`,
        value: ''
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(e);
  };

  // Get all available platforms
  const availablePlatforms = getAvailablePlatforms();

  // Filter out already added platforms
  const availablePlatformsToAdd = availablePlatforms.filter(
    platform => !accounts.some(account => account.type === platform.type)
  );

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-lg flex items-center">
          <span className="h-5 w-5 ml-2 text-oksale-600">
            {availablePlatforms.find(p => p.type === 'website')?.icon}
          </span>
          وسائل التواصل الاجتماعي
        </CardTitle>
        <CardDescription>يمكنك إضافة حتى 3 حسابات تواصل اجتماعي لمتجرك</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {accounts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {accounts.map((account) => {
              const platform = availablePlatforms.find(p => p.type === account.type);
              
              return (
                <div 
                  key={account.type} 
                  className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white border">
                      {platform?.icon}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{platform?.label}</p>
                      <p className="text-xs text-gray-500">{account.username}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveAccount(account.type)}
                    className="text-gray-500 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">حذف</span>
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 border rounded-md bg-gray-50">
            <p className="text-muted-foreground mb-2">لم تقم بإضافة أي حسابات تواصل اجتماعي بعد</p>
          </div>
        )}

        {maxAccountsReached && (
          <Alert>
            <AlertDescription className="text-sm">
              لقد وصلت للحد الأقصى (3 حسابات). يجب حذف أحد الحسابات قبل إضافة حساب جديد.
            </AlertDescription>
          </Alert>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full flex items-center gap-2"
              disabled={maxAccountsReached}
            >
              <PlusCircle className="h-4 w-4" />
              إضافة حساب تواصل اجتماعي
            </Button>
          </DialogTrigger>
          <DialogContent>
            {step === 'select' ? (
              <>
                <DialogHeader>
                  <DialogTitle>اختر منصة التواصل الاجتماعي</DialogTitle>
                  <DialogDescription>
                    حدد المنصة التي تريد إضافة حسابك عليها
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[300px] overflow-y-auto">
                  {availablePlatformsToAdd.length > 0 ? (
                    availablePlatformsToAdd.map((platform) => (
                      <Button
                        key={platform.type}
                        variant="outline"
                        className="justify-start h-auto py-3 px-4"
                        onClick={() => {
                          setNewAccount({ ...newAccount, type: platform.type });
                          setStep('input');
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                            {platform.icon}
                          </span>
                          <span>{platform.label}</span>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">لقد أضفت جميع المنصات المتاحة</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>
                    أضف حساب {availablePlatforms.find(p => p.type === newAccount.type)?.label}
                  </DialogTitle>
                  <DialogDescription>
                    أدخل معلومات حسابك على {availablePlatforms.find(p => p.type === newAccount.type)?.label}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="social-username">اسم المستخدم</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-r-none rounded-l-md border border-l-0 border-input bg-gray-50 text-gray-500">
                        {newAccount.type && availablePlatforms.find(p => p.type === newAccount.type)?.icon}
                      </span>
                      <Input 
                        id="social-username" 
                        placeholder={getPlaceholder(newAccount.type as SocialMediaType)}
                        value={newAccount.username}
                        onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
                        dir="ltr"
                        className="rounded-r-none transition-all focus:border-oksale-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500">{getHelperText(newAccount.type as SocialMediaType)}</p>
                  </div>
                </div>
                <DialogFooter className="flex justify-between gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setStep('select');
                      setNewAccount({ ...newAccount, username: '' });
                    }}
                  >
                    رجوع
                  </Button>
                  <Button 
                    onClick={handleAddAccount}
                    disabled={!newAccount.username.trim()}
                  >
                    إضافة
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SocialMediaSection;
