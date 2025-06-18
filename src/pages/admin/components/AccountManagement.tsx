
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Lock, Mail, Shield, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AccountManagement = () => {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [resettingPassword, setResettingPassword] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        first_name: '',
        last_name: '',
        email: ''
    });
    const { toast } = useToast();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser(session.user);
                
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                
                setProfile(profileData);
                setFormData({
                    full_name: profileData?.full_name || '',
                    first_name: profileData?.first_name || '',
                    last_name: profileData?.last_name || '',
                    email: session.user.email || ''
                });
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        setUpdating(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    full_name: formData.full_name,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;

            toast({
                title: "Profile Updated",
                description: "Your profile has been successfully updated.",
            });
            
            loadUserData();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: error.message,
            });
        } finally {
            setUpdating(false);
        }
    };

    const handlePasswordReset = async () => {
        setResettingPassword(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
                redirectTo: `${window.location.origin}/admin/auth`
            });

            if (error) throw error;

            toast({
                title: "Password Reset Sent",
                description: "Check your email for password reset instructions.",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Reset Failed",
                description: error.message,
            });
        } finally {
            setResettingPassword(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                        Account Management
                    </h1>
                    <p className="text-muted-foreground mt-2">Manage your admin account settings and security</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin Access
                </Badge>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Profile Information */}
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <CardHeader className="relative">
                        <CardTitle className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-600" />
                            </div>
                            Profile Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="full_name">Full Name</Label>
                                <Input
                                    id="full_name"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                                    placeholder="Enter your full name"
                                    className="mt-1"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="first_name">First Name</Label>
                                    <Input
                                        id="first_name"
                                        value={formData.first_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                                        placeholder="First name"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        value={formData.last_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                                        placeholder="Last name"
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <Button 
                            onClick={handleUpdateProfile} 
                            disabled={updating}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                            {updating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Update Profile
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Security Settings */}
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <CardHeader className="relative">
                        <CardTitle className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                <Lock className="h-4 w-4 text-red-600" />
                            </div>
                            Security Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        value={formData.email}
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Email cannot be changed from this panel
                                </p>
                            </div>
                            
                            <Separator />
                            
                            <Alert>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                    Password reset will send an email to your registered address. You'll need to follow the link to set a new password.
                                </AlertDescription>
                            </Alert>
                        </div>
                        
                        <Button 
                            onClick={handlePasswordReset} 
                            disabled={resettingPassword}
                            variant="outline"
                            className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                        >
                            {resettingPassword ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Sending Reset Email...
                                </>
                            ) : (
                                <>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Reset Password
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Account Status */}
            <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                        <CheckCircle className="h-5 w-5" />
                        Account Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                            <div className="text-sm text-muted-foreground">Account Type</div>
                            <div className="font-semibold text-green-700 dark:text-green-300">Administrator</div>
                        </div>
                        <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                            <div className="text-sm text-muted-foreground">Status</div>
                            <div className="font-semibold text-green-700 dark:text-green-300">Active</div>
                        </div>
                        <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                            <div className="text-sm text-muted-foreground">Last Updated</div>
                            <div className="font-semibold text-green-700 dark:text-green-300">
                                {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'Never'}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AccountManagement;
