#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Character.h"
#include "$class_name_no_prefix$.generated.h"

UCLASS()
class $apimacro$ $class_name$ : public ACharacter
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
