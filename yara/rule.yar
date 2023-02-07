rule secret_string
{
	meta:
		description = "Detects secret string"	

    strings:
		$string_a = "secret"

	condition:
		any of them
}

