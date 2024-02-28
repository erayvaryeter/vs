#include "$header_include$"

$loctext_comment_ctor2$
$class_name$::$class_name$()
{
	$loctext_comment_canevertick$
	PrimaryActorTick.bCanEverTick = true;
}

$loctext_comment_beginplay$
void $class_name$::BeginPlay()
{
	Super::BeginPlay();
}

$loctext_comment_tick$
void $class_name$::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}

$loctext_comment_inputcomponent$
void $class_name$::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);
}
