#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Pawn.h"
#include "$class_name_no_prefix$.generated.h"

UCLASS()
class $apimacro$ $class_name$ : public APawn
{
	GENERATED_BODY()

public:
	$loctext_comment_ctor$
	$class_name$();

protected:
	$loctext_comment_beginplay$
	virtual void BeginPlay() override;

public:
	$loctext_comment_tick$
	virtual void Tick(float DeltaTime) override;

	$loctext_comment_inputcomponent$
	virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;
};
