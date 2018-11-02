<?php
	header("content-type:text/html;charset=utf-8");
	require_once "DbController.php";
	class StudioController extends DbController
	{
	
	    public function studioAction()
	    {
	    		session_start();
	    		$_SESSION['mysqli']=new Application_Model_Studio();
	    		$mysqli=$_SESSION['mysqli'];
			
				$res=$mysqli->provinceOperation();
				if(!$res){
					echo false;
				}else{
					//初始化省份
					$this->view->res=$res;
					//初始化城市
					$res=$mysqli->cityOperation($res[0]['province']);
					$this->view->city=$res;
					//初始化工作室列表
					$res=$mysqli->dqlOperation($res[0]['city']);
					$this->view->list=$res;
					$this->render('studio');
				}
	    }
	
		//获取城市
		public function cityAction(){
			session_start();
			if(!$_SESSION['mysqli']){
				header("location: /studio/studio",true,301);
				exit();
			}
			
			$mysqli=$_SESSION['mysqli'];
			
			$val=$_POST['province'];
			$res=$mysqli->cityOperation($val);
			if(!$res){
				echo false;
			}else{
				echo json_encode($res);
			}
			exit();
		}
		//获取工作室列表
		public function listAction(){
			session_start();
			if(!$_SESSION['mysqli']){
				header("location: /studio/studio",true,301);
				exit();
			}
			
			$mysqli=$_SESSION['mysqli'];
			
			$city=$_POST['city'];
			
			$res=$mysqli->dqlOperation($city);
			if(!$res){
				echo false;
			}else{
				echo json_encode($res);
			}
			exit();
		}
	
	}
?>