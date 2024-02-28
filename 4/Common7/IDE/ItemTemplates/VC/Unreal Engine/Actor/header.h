#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "$class_name_no_prefix$.generated.h"

UCLASS()
class $apimacro$ $class_name$ : public AActor
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
};
