// dllmain.h : Declaration of module class.

class $safeatlmodulename$ : public ATL::CAtlDllModuleT< $safeatlmodulename$ >
{
public :
	DECLARE_LIBID(LIBID_$safeprojectname$Lib)
	DECLARE_REGISTRY_APPID_RESOURCEID(IDR_$safercprojectname$, "{$guid_libid$}")
};

extern class $safeatlmodulename$ _AtlModule;
