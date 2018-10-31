<?php
	require_once "DbController.php";
	class StudioController extends DbController
	{
	
	
	    public function studioAction()
	    {
	        // action body
	    }
	
		public function cityAction(){
			echo 1;
			$city=new Application_Model_Studio();
//			print_r($studio);
			
//			exit();
		}
	
	}
?>